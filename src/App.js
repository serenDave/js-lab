import React, { useEffect, useState } from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const App = () => {
  const [name, setName] = useState('незнакомец');
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [breedsList, setBreedsList] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => {
        setBreeds(data.message);
      });
  }, []);

  const getRandomBreedName = () => {
    const breedsArr = Object.keys(breeds);

    const selectedIndex = Math.floor(Math.random() * breedsArr.length);
    return breedsArr[selectedIndex];
  }

  const selectRandomBreed = async () => {
    const selectedBreedName = getRandomBreedName();

    const response = await fetch(`https://dog.ceo/api/breed/${selectedBreedName}/images/random`);
    const parsedResponse = await response.json();

    setSelectedBreed({
      name: selectedBreedName,
      image: parsedResponse.message,
    });
  };

  const addRandomBreed = () => {
    setBreedsList([...breedsList, getRandomBreedName() ]);
  };

  const removeRandomBreed = () => {
    const randomRemoveIndex = Math.floor(Math.random() * breedsList.length);
    const updatedBreedsList = breedsList.filter((_, i) => i !== randomRemoveIndex);

    setBreedsList(updatedBreedsList);
  };

  const mixUpBreedsList = () => {
    const updatedBreedsList = [...breedsList];
    shuffleArray(updatedBreedsList);
    setBreedsList(updatedBreedsList);
  };

  return (
    <div className="App">
      <h3>Задание 1: ввод текста</h3>
      <input
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setName(e.target.value);
          } else {
            setName('незнакомец');
          }
        }}
      />
      <p>Привет, {name}</p>
      <div className="divider" />
      <h3>Задание 2: вывод пород</h3>
      <ul style={{ padding: 10 }}>
        {Object.keys(breeds).map((breed) => (
          <React.Fragment>
            <li>{breed}</li>
            {!!breeds[breed].length && (
              <ul style={{ marginLeft: 20 }}>
                {breeds[breed].map((subBreed) => (
                  <li style={{ color: 'red' }}>{subBreed}</li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className="divider" />
      <h3>Задание 3: случайный выбор породы</h3>
      <div>
        {selectedBreed && (
          <div className="randomBreedContainer">
            <p style={{ marginRight: 5 }}>{selectedBreed.name}</p>
            <div style={{ maxWidth: 400 }}>
              <img width="100%" src={selectedBreed.image} alt="breed" />
            </div>
          </div>
         )}
        <button onClick={() => selectRandomBreed()}>Click me</button>
      </div>
      <div className="divider" />
      <h4>Кнопки с добавлением / удалением случайной породы</h4>
      <div style={{ flex: 'row', marginBottom: 10 }}>
          <button style={{ marginRight: 10 }} onClick={() => addRandomBreed()}>Add random breed</button>
          <button style={{ marginRight: 10 }} onClick={() => removeRandomBreed()}>Remove random breed</button>
          <button onClick={() => mixUpBreedsList()}>Mix up the list</button>
      </div>
      <ul>
          {breedsList.map((breed, i) => (
            <li key={i}>{breed}</li>
          ))}
      </ul>
    </div>
  );
};

export default App;
