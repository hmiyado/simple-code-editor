const encode = (str: string): string => {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  
const decode = (str: string): string => {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
      str += "=";
    }
    try {
      return atob(str);
    } catch {
      return "";
    }
  };

const Base64Url = { encode, decode };

export default Base64Url;
