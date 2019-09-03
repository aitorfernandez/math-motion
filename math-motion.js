export default (p) => {
  function play() {
    p.loop()
  }

  function stop() {
    p.noLoop()
  }

  function reset() {

  }

  function setup() {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.frameRate(24)

    reset()
  }

  function draw() {
  }

  p.play = play
  p.stop = stop

  p.reset = reset

  p.setup = setup
  p.draw = draw
}
