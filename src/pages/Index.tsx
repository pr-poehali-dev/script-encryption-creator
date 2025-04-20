
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

interface Scenario {
  id: string;
  codeword: string;
  result: string;
}

const Index = () => {
  const [codeword, setCodeword] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // Загрузка сценариев из localStorage при монтировании
  useEffect(() => {
    const savedScenarios = localStorage.getItem("scenarios");
    if (savedScenarios) {
      setScenarios(JSON.parse(savedScenarios));
    }
  }, []);

  // Обработка ввода шифр-слова
  const handleCodewordCheck = () => {
    const foundScenario = scenarios.find(
      (scenario) => scenario.codeword.toLowerCase() === codeword.toLowerCase()
    );
    
    if (foundScenario) {
      setResult(foundScenario.result);
    } else {
      setResult("Шифр-слово не найдено");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f6f6f7] to-[#e5deff] p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">Шифр-слова</h1>
          <p className="text-[#8E9196]">Введите шифр-слово или создайте новый сценарий</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Введите шифр-слово"
              value={codeword}
              onChange={(e) => setCodeword(e.target.value)}
              className="border-[#D6BCFA] focus-visible:ring-[#9b87f5]"
            />
            <Button 
              onClick={handleCodewordCheck}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              <Search />
            </Button>
          </div>

          {result && (
            <div className="bg-[#F2FCE2] p-4 rounded-lg border border-[#D6BCFA] animate-fade-in">
              <p className="font-medium">{result}</p>
            </div>
          )}
        </div>

        <Link to="/create">
          <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
            <PlusCircle />
            Создать новый сценарий
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
