import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getReceptById } from '../services/receptService';

interface Recept {
  id: number;
  naam: string;
  beschrijving: string;
}

const ReceptDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recept, setRecept] = useState<Recept | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getReceptById(Number(id))
        .then(setRecept)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) return <p>Fout: {error}</p>;
  if (!recept) return <p>Loading...</p>;

  return (
    <main>
      <h1>{recept.naam}</h1>
      <p>{recept.beschrijving}</p>
    </main>
  );
};

export default ReceptDetails;