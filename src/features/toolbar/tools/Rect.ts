import Tool from './Tool'

export default class Brush extends Tool {
  private mouseDown = false
  private startX = 0
  private startY = 0
  private saved = ''

  constructor(
    canvas: HTMLCanvasElement,
    socket: CanvasRenderingContext2D,
    sessionId: string
  ) {
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
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()

    this.startX = e.pageX - this.canvas.offsetLeft
    this.startY = e.pageY - this.canvas.offsetTop

    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: any) {
    if (!this.mouseDown) {
      return
    }

    let currentX = e.pageX - this.canvas.offsetLeft
    let currentY = e.pageY - this.canvas.offsetTop
    let width = currentX - this.startX
    let height = currentY - this.startY
    this.draw(this.startX, this.startY, width, height)
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved
    img.addEventListener('load', () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.rect(x, y, w, h)
      this.ctx?.fill()
      this.ctx?.stroke()
    })
  }
}
