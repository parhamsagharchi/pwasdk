import { ScaleLoader } from "react-spinners";
import {
  PAGE_LOADER_COLOR,
  PAGE_LOADER_HEIGHT,
  PAGE_LOADER_MARGIN,
  PAGE_LOADER_RADIUS,
  PAGE_LOADER_WIDTH,
} from "./page-loader.constants";

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading">
      <ScaleLoader
        color={PAGE_LOADER_COLOR}
        height={PAGE_LOADER_HEIGHT}
        width={PAGE_LOADER_WIDTH}
        radius={PAGE_LOADER_RADIUS}
        margin={PAGE_LOADER_MARGIN}
      />
    </div>
  );
}

export default PageLoader;
