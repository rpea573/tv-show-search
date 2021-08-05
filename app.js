const form = document.querySelector("#searchForm");
const tvShowList = document.querySelector("#tvShowList");

// This is utilizing and API to search for tv shows
const searchTv = async function (search) {
  try {
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${search}`
    );
    return res.data;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

//This function takes the search results and adds the images to the page
const addResults = async function (showsData) {
  for (show of showsData) {
    let showImgSrc = show.show.image.original;
    //Creating elements
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    //Add source for new image
    newImg.src = showImgSrc;
    //Adding class for managing the image sizes
    newDiv.classList.add("tvShowImage");
    //appending new elements
    tvShowList.append(newDiv);
    newDiv.append(newImg);
  }
};

//This function clears the previous search results if there were any
const clear = function () {
  const allShows = document.querySelectorAll(".tvShowImage");
  if (allShows.length > 0) {
    for (const element of allShows) {
      element.remove();
    }
  }
};

// On search this async function runs the functions above
form.addEventListener("submit", async (evt) => {
  // this event function stops the default action
  // in this case prevents the form submission...
  evt.preventDefault();
  const searchTerm = form.elements.query.value;
  const showsData = await searchTv(searchTerm);
  clear();
  addResults(showsData);
});
