
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f6f6f7] to-[#e5deff]">
      {/* Кнопка создания сценария сверху */}
      <div className="w-full flex justify-end p-4">
        <Link to="/create">
          <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
            <PlusCircle className="mr-2" />
            Создать новый сценарий
          </Button>
        </Link>
      </div>
      
      {/* Центральное содержимое */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-4">Шифр-слова</h1>
          <p className="text-[#8E9196] text-lg">Введите шифр-слово для проверки</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="ВВЕДИТЕ ШИФР-СЛОВО"
              value={codeword}
              onChange={(e) => setCodeword(e.target.value)}
              className="border-[#D6BCFA] focus-visible:ring-[#9b87f5] text-xl h-14 uppercase placeholder:uppercase"
              onKeyDown={(e) => e.key === 'Enter' && handleCodewordCheck()}
            />
            <Button 
              onClick={handleCodewordCheck}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] h-14 w-14"
              size="icon"
            >
              <Search size={24} />
            </Button>
          </div>

          {result && (
            <div className="bg-[#F2FCE2] p-6 rounded-lg border border-[#D6BCFA] animate-fade-in">
              <p className="font-medium text-lg">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
