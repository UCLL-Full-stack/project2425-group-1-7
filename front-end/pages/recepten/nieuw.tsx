import { useState } from 'react';
import { useRouter } from 'next/router';
import { createRecept } from '../services/receptService';

const NieuwRecept = () => {
  const [naam, setNaam] = useState('');
  const [beschrijving, setBeschrijving] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Valideer dat categorieId een nummer is
      const parsedCategorieId = parseInt(categorieId, 10);
      if (isNaN(parsedCategorieId)) {
        throw new Error('Categorie ID moet een geldig nummer zijn.');
      }

      await createRecept({ naam, beschrijving, categorieId: parsedCategorieId });
      router.push('/recepten');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Onbekende fout opgetreden.');
      }
    }
  };

  return (
    <main>
      <h1>Nieuw Recept</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Naam:
          <input
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            required
          />
        </label>
        <label>
          Beschrijving:
          <textarea
            value={beschrijving}
            onChange={(e) => setBeschrijving(e.target.value)}
            required
          />
        </label>
        <label>
          Categorie ID:
          <input
            type="text"
            value={categorieId}
            onChange={(e) => setCategorieId(e.target.value)}
            required
            placeholder="Voer een categorie ID in"
          />
        </label>
        <button type="submit">Opslaan</button>
        {error && <p style={{ color: 'red' }}>Fout: {error}</p>}
      </form>
    </main>
  );
};

export default NieuwRecept;