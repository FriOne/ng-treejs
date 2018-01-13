/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  mozRequestAnimationFrame(callback: FrameRequestCallback): number;
  oRequestAnimationFrame(callback: FrameRequestCallback): number;
  msRequestAnimationFrame(callback: FrameRequestCallback): number;
}
