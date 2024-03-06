import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetail = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const characterData = characterResponse.data;
        if (characterData.episode && characterData.episode.length > 0) {
          const episodeUrl = characterData.episode[0];
          const episodeResponse = await axios.get(episodeUrl);
          const episodeData = episodeResponse.data;
          const updatedCharacter = { ...characterData, episode: episodeData };
          setCharacter(updatedCharacter);
        } else {
          setCharacter(characterData);
        }
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Details of the Character</h2>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{`Name: ${character.name}`}</dt>
              <dd className="mt-2 text-sm text-gray-500">{character.status ? `Status ${character.status}` : "Status N/A"}</dd>
              <dd className="mt-2 text-sm text-gray-500">{character.species ? `Species ${character.species}` : "Species N/A"}</dd>
              <dd className="mt-2 text-sm text-gray-500">{character.gender ? `Gender ${character.gender}` : "Gender N/A"}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{character?.origin ? `Origin Name ${character.origin.name}` : "Origin Name N/A"}</dt>
              <dd className="mt-2 text-sm text-gray-500">{character?.location ? `Last known location: ${character.location.name}` : "Location Name N/A"}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img className="rounded-lg bg-gray-100" src={character.image} alt={character.name} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
