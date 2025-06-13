
//global scope variables
var prevImg = 0;
var currImg = 0;

function openModal() {
	  document.getElementById('myModal').style.display = "block";
	}

	function closeModal() {
	  document.getElementById('myModal').style.display = "none";
	}

	var slideIndex = 1;
	showSlides(slideIndex);

	function plusSlides(n) {
	  showSlides(slideIndex += n);
	}

	function currentSlide(n) {
	  showSlides(slideIndex = n);
	}


	//Ozane: this function does the following:
	//	1. Removes the magnification from the previous image if any.
	// 	2. Updates the previous image
	// 	3. Displays the image we want
	//	4. Adds the magnification to the current image
	function showSlides(n) {
	  //ozane: Added to remove the magnifcation from image displayed previously.
		if(prevImg!=0)
		{
			clearMagnify('image'+prevImg);
		}

		 //set the previous image
	  	prevImg = currImg;

	  var i;
	  var slides = document.getElementsByClassName("mySlides");
	  //var dots = document.getElementsByClassName("demo");
	  var captionText = document.getElementById("caption");
	  if (n > slides.length) {slideIndex = 1;}
	  if (n < 1) {slideIndex = 1;}
	  for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none";
	  }
	  //for (i = 0; i < dots.length; i++) {
	  //    dots[i].className = dots[i].className.replace(" active", "");
	  //}

	  slides[slideIndex-1].style.display = "block";
	  //dots[slideIndex-1].className += " active";
	  //captionText.innerHTML = dots[slideIndex-1].alt;

		// set the current image
		currImg= slideIndex;
	}

//ozane: added function to clear the magnifying glass from the previous image
function clearMagnify(imgID) {
	var img= document.getElementById(imgID);

	var wrapper = img.parentNode.getElementsByClassName('img-magnifier-glass')[0];
	if (typeof wrapper != 'undefined')
	{
		// remmove the wrapper from img
	    img.parentNode.innerHTML = wrapper.innerHTML + img.outerHTML;
	}
}

function magnify(zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById('image'+currImg);

  /* first make sure it is not already magnified, so clear the magnification */
  clearMagnify('image'+currImg);

  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  /*execute a function when someone clicks the mouse to remove the magnification*/
  glass.addEventListener("click",clearM);
  img.addEventListener("click", clearM);

    function clearM(e) {
		clearMagnify('image'+currImg);
	}



  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
