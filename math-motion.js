export default (p) => {
  const opacity = 3500

  const rectangles = []

  const colors = [
    '#fca19c',
    '#d2f97c',
    '#f7aac5',
    '#ebbdf9',
    '#ed74be',
    '#c97af9',
    '#af7aff',
    '#aefcae',
    '#abfc8f',
    '#f9e8b1',
    '#fc85d0',
    '#f9ab95',
    '#c9f79b',
    '#6e95dd',
    '#f49681',
    '#7ff9c2',
    '#f48bf9',
    '#fc99bc',
    '#f9e789',
    '#e2abf4',
    '#c7f9fc',
    '#adffb0',
    '#f27bb0',
    '#f28abf',
    '#ef9070',
    '#f9bbcc',
    '#a5fff4'
  ]

  const motions = [
    (angle) => p.pow(p.abs(p.sin(angle * 2)) * 0.6, p.sin(angle * 2)) * 0.6,
    (angle) => p.cos(p.sin(angle * 3) + (angle * 3)),
    (angle) => p.cos(p.sin(angle) * p.tan(angle * p.PI) * p.PI / 8),
    (angle) => p.pow(p.sin(angle * p.PI), 12),
    (angle) => p.sin(angle - p.PI * p.tan(angle) * 0.02),
    (angle) => p.sin(p.exp(p.cos(angle * 0.8)) * 2),
    (angle) => p.sin(p.pow(8, p.sin(angle))),
    (angle) => p.cos(p.sin(angle * 2) * p.sin(angle * 2)),
    (angle) => p.sin(p.tan(angle) * 0.06),
    (angle) => p.sin(p.tan(p.cos(angle) * 1.2)),
    (angle) => p.abs(p.cos(angle * 2) * p.sin(angle * 4)),
    (angle) => p.sin(angle) * p.sin(angle * 1.4),
    (angle) => p.pow(p.sin(angle), 3),
    (angle) => p.cos(angle) * p.sin(angle),
    (angle) => p.sin(angle)
  ]

  function createRectangle(id) {
    const color = p.color(p.random(colors))
    const height = p.height - p.random(192)
    const width = p.random(12, 72)

    let life = opacity * 3
    let x = p.width

    function draw() {
      const angle = p.radians(p.frameCount)
      const motion = ((motions[id](angle, height) * height) / 2) + (height / 2)

      life -= p.random(motion / 12)

      x -= 1
      if (x < 0) {
        x = p.width
      }

      if (life > 0) {
        color.setAlpha(life / 3)
        p.fill(color)
        p.rect(x, p.height / 2, width, motion)
      }
    }

    function isAlive() {
      return life > 0
    }

    return {
      isAlive,
      draw
    }
  }

  function play() {
    p.loop()
  }

  function stop() {
    p.noLoop()
  }

  function reset() {
    rectangles.length = 0
    rectangles.push(
      createRectangle(p.floor(p.random(motions.length)))
    )
  }

  function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.RGB, 255, 255, 255, opacity)

    p.frameRate(48)

    p.noStroke()
    p.rectMode(p.CENTER)

    reset()
  }

  function draw() {
    p.background(255)

    if (
      p.frameCount % 50 === 0
      && p.random() < 0.8
    ) {
      rectangles.push(
        createRectangle(p.floor(p.random(motions.length)))
      )
    }

    let i = rectangles.length
    while (i -= 1) {
      if (!rectangles[i].isAlive()) {
        rectangles.splice(i, 1)
      }
    }

    rectangles.forEach((rectangle) => {
      rectangle.draw()
    })
  }

  p.play = play
  p.stop = stop

  p.reset = reset

  p.setup = setup
  p.draw = draw
}
