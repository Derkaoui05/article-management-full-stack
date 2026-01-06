import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: { code: string; designation: string }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [code, setCode] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSearch = () => {
    onFilterChange({ code, designation });
  };

  const handleReset = () => {
    setCode('');
    setDesignation('');
    onFilterChange({ code: '', designation: '' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-32"
      />
      <Input
        type="text"
        placeholder="Désignation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-48"
      />
      <Button onClick={handleSearch} size="sm" className="gap-2">
        <Search className="h-4 w-4" />
        Rechercher
      </Button>
      {(code || designation) && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Réinitialiser
        </Button>
      )}
    </div>
  );
}