// Se putea face mai usor direct cu url-ul pus in src, dar am inteles ca trebuie sa facem cu axios/fetch
const createPage = async () => {
    createImageSection();
    await createRandomButton();
    const image = await getImageResponse();
    createRandomImage(image);
};

const getImageResponse = async () => {
  try {
      const response = await axios.get('https://picsum.photos/200/300/?random', {
          responseType: 'arraybuffer'
      });
      return btoa(String.fromCharCode(...new Uint8Array(response.data)));
  }  catch (error) {
      console.log(error);
  }
};

const createRandomImage = (response) => {
    const image = document.getElementsByClassName('random_image')[0];
    image.src = "data:image/jpeg;base64," + response;
};

const createImageSection = () => {
    const imageSection = document.createElement('section');
    imageSection.className = 'image_section';
    const header = document.createElement('h2');
    header.className = 'section_title';
    header.innerHTML = 'Random Image';
    const image = document.createElement('img');
    image.className = 'random_image';

    imageSection.appendChild(header);
    imageSection.appendChild(image);
    document.body.appendChild(imageSection);
};

const createRandomButton = async () => {
  const randomButton = document.createElement('button');
  randomButton.className = 'random_button';
  randomButton.innerHTML = 'Get Random Image';
  randomButton.onclick = await onRandomButtonClick;
  document.getElementsByClassName('image_section')[0].appendChild(randomButton);
};

const onRandomButtonClick = async () => {
    console.log('click');
    const image = await getImageResponse();
    createRandomImage(image);
};


createPage();