//https://www.omdbapi.com/?t=Harry+Potter+and+the+Sorcerer%27s+Stone&apikey=7b0ea037

export const formatToTitleURLRequest = (url, title, apikey) => {
  return url + "t=" + title.trim().replace(" ", "+") + "&apikey=" + apikey;
};
