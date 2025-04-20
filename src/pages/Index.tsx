
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a0d1c] to-[#0f0710] dark text-white">
      {/* Кнопка создания сценария сверху */}
      <div className="w-full flex justify-end p-4">
        <Link to="/create">
          <Button className="bg-[#ff5cad] hover:bg-[#ff3896] text-black font-semibold neon-button">
            <PlusCircle className="mr-2" />
            Создать новый сценарий
          </Button>
        </Link>
      </div>
      
      {/* Центральное содержимое */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ff5cad] mb-4 neon-text flicker">Шифр-слова</h1>
          <p className="text-[#d1a6bb] text-lg">Введите шифр-слово чтобы узнать подсказку</p>
        </div>

        <div className="bg-[#231327] rounded-xl p-8 w-full max-w-lg border border-[#ff5cad]/30 neon-box">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="ВВЕДИТЕ ШИФР-СЛОВО"
              value={codeword}
              onChange={(e) => setCodeword(e.target.value)}
              className="border-[#ff5cad] focus-visible:ring-[#ff5cad] bg-[#2c1a30] text-xl h-14 uppercase placeholder:uppercase text-[#ff5cad] neon-input"
              onKeyDown={(e) => e.key === 'Enter' && handleCodewordCheck()}
            />
            <Button 
              onClick={handleCodewordCheck}
              className="bg-[#ff5cad] hover:bg-[#ff3896] h-14 w-14 text-black neon-button"
              size="icon"
            >
              <Search size={24} />
            </Button>
          </div>

          {result && (
            <div className="bg-[#2c1a30] p-6 rounded-lg border border-[#ff5cad]/50 animate-fade-in neon-border">
              <p className="font-medium text-lg text-white">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
