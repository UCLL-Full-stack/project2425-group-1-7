import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRecepten } from '../services/receptService';

interface Recept {
  id: number;
  naam: string;
}

const ReceptenOverzicht = () => {
  const [recepten, setRecepten] = useState<Recept[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecepten()
      .then(setRecepten)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Fout: {error}</p>;

  return (
    <main>
      <h1>Recepten Overzicht</h1>
      <Link href="/recepten/nieuw">
        <button>Nieuw Recept</button>
      </Link>
      <ul>
        {recepten.map((recept) => (
          <li key={recept.id}>
            <Link href={`/recepten/${recept.id}`}>
              {recept.naam}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ReceptenOverzicht;