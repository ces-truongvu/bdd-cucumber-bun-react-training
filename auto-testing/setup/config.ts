import { LaunchOptions } from "playwright";
import "dotenv/config";

const playwrightLaunchOptions: LaunchOptions = {
  headless: false,
  slowMo: 100
};

type Dimension = {
  width: number;
  height: number;
};

interface ViewPort {
  laptop: Dimension;
  tablet: Dimension;
  mobile: Dimension;
}

const deviceViewPort: ViewPort = {
  laptop: {
    width: 1440,
    height: 900
  },
  tablet: {
    width: 810,
    height: 1080
  },
  mobile: {
    width: 390,
    height: 844
  }
};

const screen = (): Dimension => {
  const customWidth = process.env.CUSTOM_WIDTH || 0;
  const customHeight = process.env.CUSTOM_HEIGHT || 0;
  if (customWidth && customHeight) {
    return {
      width: Number(customWidth),
      height: Number(customHeight)
    };
  }

  return deviceViewPort[process.env.DEVICE_VIEWPORT as keyof ViewPort];
};

export const config = {
  baseUrl: process.env.BASE_URL,
  setDefaultTimeout: Number(process.env.DEFAULT_TIMEOUT),
  playwrightLaunchOptions,
  screen: screen(),
  noneLoggedInTags: ["@login-success", "@login-unsuccess"]
};
