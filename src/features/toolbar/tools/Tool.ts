export default class Tool {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  dpr: number
  socket: any
  sessionId: string

  constructor(canvas: HTMLCanvasElement, socket: any, sessionId: string) {
    this.canvas = canvas
    this.socket = socket
    this.sessionId = sessionId

    this.dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * this.dpr
    canvas.height = rect.height * this.dpr

    this.ctx = canvas.getContext('2d')
    this.ctx?.scale(this.dpr, this.dpr)
    // this.destroy()
  }

  set fillColor(color: string) {
    this.ctx!.fillStyle = color
  }

  set strokeColor(color: string) {
    this.ctx!.strokeStyle = color
  }

  set lineWidth(width: number) {
    this.ctx!.lineWidth = width
  }

  // destroy() {
  //   const canvas = document.querySelector('canvas')
  //   this.canvas.removeEventListener(
  //     'mousemove',
  //     /* @ts-ignore */
  //     window.getEventListeners(canvas.mousemove[0])
  //   )
  //   this.canvas.removeEventListener(
  //     'mouseup',
  //     /* @ts-ignore */
  //     window.getEventListeners(canvas).mouseup[0]
  //   )
  //   this.canvas.removeEventListener(
  //     'mousedown',
  //     /* @ts-ignore */
  //     window.getEventListeners(canvas).mousedown[0]
  //   )
  // }
}
