import Tool from './Tool'

export default class Brush extends Tool {
  private mouseDown: Boolean = false

  constructor(canvas: HTMLCanvasElement, socket: any, sessionId: string) {
    super(canvas, socket, sessionId)
    this.mouseUpHandler = this.mouseUpHandler.bind(this)
    this.mouseDownHandler = this.mouseDownHandler.bind(this)
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this)

    this.listen()
  }

  listen() {
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler)
    this.canvas.addEventListener('mouseup', this.mouseUpHandler)
    this.canvas.addEventListener('mousedown', this.mouseDownHandler)
  }

  mouseUpHandler() {
    this.mouseDown = false
    this.socket.send(
      JSON.stringify({
        id: this.sessionId,
        type: 'draw',
        figure: {
          type: 'finish',
        },
      })
    )
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()

    this.ctx?.moveTo(
      e.pageX - this.canvas.offsetLeft,
      e.pageY - this.canvas.offsetTop
    )
  }

  mouseMoveHandler(e: any) {
    const drawX = e.pageX - this.canvas.offsetLeft
    const drawY = e.pageY - this.canvas.offsetTop
    if (!this.mouseDown) {
      return
    }

    // this.draw(drawX, drawY)
    this.socket.send(
      JSON.stringify({
        type: 'draw',
        id: this.sessionId,
        figure: {
          type: 'brush',
          x: drawX,
          y: drawY,
        },
      })
    )
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
