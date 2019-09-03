export default (p) => {
  let rectangle

  const motions = [
    (angle, height) => (p.sin(angle) * height) / 2 + (height / 2),
    (angle, height) => ((p.cos(angle) * p.sin(angle)) * height) / 2 + (height / 2)
  ]

  function createRectangle() {
    const width = p.random(12, 72)
    const height = p.height - p.random(192)

    let x = p.width

    function draw() {
      const angle = p.radians(p.frameCount)
      const motion = motions[0](angle, height)

      x -= 1
      if (x < 0) {
        x = p.width
      }

      p.fill('tomato')
      p.rect(x, p.height / 2, width, motion)
    }

    return {
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
    rectangle = createRectangle()
  }

  function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.frameRate(24)
    p.noStroke()
    p.rectMode(p.CENTER)

    reset()
  }

  function draw() {
    p.background(255)
    rectangle.draw()
  }

  p.play = play
  p.stop = stop

  p.reset = reset

  p.setup = setup
  p.draw = draw
}
