import colors from "colors";

const getTimeStamp = (): String => {
  return new Date().toISOString();
};

const info = (message: String, object?: any): void => {
  if (object) {
    console.info(
      colors.yellow(`[${getTimeStamp()}] [INFO] [${message}]`),
      object
    );
  } else {
    console.info(colors.yellow(`[${getTimeStamp()}] [INFO] [${message}]`));
  }
};

const error = (message: String, object?: any): void => {
  if (object) {
    console.info(
      colors.red(`[${getTimeStamp()}] [ERROR] [${message}]`),
      object
    );
  } else {
    console.info(colors.red(`[${getTimeStamp()}] [ERROR] [${message}]`));
  }
};

export default { info, error };
