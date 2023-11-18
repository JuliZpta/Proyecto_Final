import { Ripples } from "@uiball/loaders";

export const LoadingPage = () => {
  return (
    <div className="fullscreen-spinner">
      <Ripples size={110} speed={1} color="#fff" />
    </div>
  )
}
