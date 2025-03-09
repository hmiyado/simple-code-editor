const encode = (str: string): string => {
    const uriComponent = encodeURIComponent(str);
    return btoa(uriComponent)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
  };
  
const decode = (str: string): string => {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
      str += "=";
    }
    try {
      return decodeURIComponent(atob(str));
    } catch {
      return "";
    }
  };

const Base64Url = { encode, decode };

export default Base64Url;
