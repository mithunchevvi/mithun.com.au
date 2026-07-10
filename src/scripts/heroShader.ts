const vertexSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_dark;

  const float PI = 3.14159265359;

  float contour(float value, float sharpness) {
    return pow(1.0 - abs(sin(value * PI)), sharpness);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0);
    float time = u_time * 0.115;

    float broadField =
      p.x * 0.92 +
      sin(p.y * 4.1 + time) * 0.20 +
      sin((p.x - p.y) * 3.2 - time * 0.72) * 0.09;

    float fineField =
      p.y * 1.2 +
      sin(p.x * 4.8 - time * 0.84) * 0.16 +
      sin((p.x + p.y) * 5.4 + time * 0.43) * 0.055;

    float broadLines = contour(broadField * 4.0, 24.0);
    float fineLines = contour(fineField * 5.0, 32.0) * 0.44;

    vec2 delta = p - pointer;
    float distanceField = length(delta) * 6.0 - time * 0.68;
    float pointerRings = contour(distanceField, 34.0);
    float pointerGlow = exp(-dot(delta, delta) * 8.0);

    float edge = 1.0 - smoothstep(0.36, 1.02, length(p * vec2(0.62, 1.0)));
    float lowerRightBias = smoothstep(-0.58, 0.62, p.x - p.y * 0.28);
    float lineField = (broadLines + fineLines + pointerRings * 0.42) * (0.42 + edge * 0.58);

    vec3 lightLine = vec3(0.30, 0.49, 0.51);
    vec3 darkLine = vec3(0.55, 0.75, 0.76);
    vec3 signal = vec3(1.0, 0.35, 0.31);
    vec3 lineColor = mix(lightLine, darkLine, u_dark);
    lineColor = mix(lineColor, signal, pointerGlow * 0.10);

    float baseAlpha = mix(0.095, 0.13, u_dark);
    float alpha = lineField * baseAlpha * (0.68 + lowerRightBias * 0.32);
    alpha += pointerGlow * mix(0.014, 0.022, u_dark);

    gl_FragColor = vec4(lineColor * alpha, alpha);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export const mountHeroShader = (canvas: HTMLCanvasElement) => {
  const hero = canvas.closest<HTMLElement>(".hero");
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
    premultipliedAlpha: true,
  });

  if (!hero || !gl) {
    canvas.hidden = true;
    return;
  }

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!vertexShader || !fragmentShader || !program) {
    canvas.hidden = true;
    return;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.hidden = true;
    return;
  }

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const pointerLocation = gl.getUniformLocation(program, "u_pointer");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const darkLocation = gl.getUniformLocation(program, "u_dark");
  const buffer = gl.createBuffer();

  if (!buffer) {
    canvas.hidden = true;
    return;
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.72, y: 0.42 };
  const pointerTarget = { ...pointer };
  let frame = 0;
  let visible = true;
  let startedAt = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const draw = (now = performance.now()) => {
    resize();
    pointer.x += (pointerTarget.x - pointer.x) * 0.045;
    pointer.y += (pointerTarget.y - pointer.y) * 0.045;

    const isDark = document.documentElement.dataset.theme === "dark";
    const time = reducedMotion.matches ? 8.0 : (now - startedAt) / 1000;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(pointerLocation, pointer.x, pointer.y);
    gl.uniform1f(timeLocation, time);
    gl.uniform1f(darkLocation, isDark ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (visible && !document.hidden && !reducedMotion.matches) {
      frame = requestAnimationFrame(draw);
    }
  };

  const restart = () => {
    cancelAnimationFrame(frame);
    startedAt = performance.now();
    draw();
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointerTarget.x = (event.clientX - rect.left) / rect.width;
    pointerTarget.y = 1 - (event.clientY - rect.top) / rect.height;
  });

  hero.addEventListener("pointerleave", () => {
    pointerTarget.x = 0.72;
    pointerTarget.y = 0.42;
  });

  new ResizeObserver(() => draw()).observe(hero);
  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) restart();
    else cancelAnimationFrame(frame);
  }, { rootMargin: "120px" }).observe(hero);

  new MutationObserver(() => draw()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  reducedMotion.addEventListener("change", restart);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && visible) restart();
    else cancelAnimationFrame(frame);
  });

  draw();
};
