export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
};

export const updateFavourites = (id, favourites) => {
  
  if(!Array.isArray(favourites) ){
    favourites = []
  }

  if (Array.isArray(favourites) && favourites.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites) => {
  // Ensure that favourites is an array or provide a default empty array


  
  return (Array.isArray(favourites) && favourites.includes(id) ? "#fa3e5f" : "white")
};

export const validateString = (value) => {
  return value?.length < 3 || value === null
    ? "Must have atleast 3 characters"
    : null;
};