
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

interface Scenario {
  id: string;
  codeword: string;
  result: string;
}

const CreateScenario = () => {
  const [codeword, setCodeword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const saveScenario = () => {
    // Валидация
    if (!codeword.trim() || !result.trim()) {
      setError("Пожалуйста, заполните оба поля");
      return;
    }

    // Получение существующих сценариев
    const savedScenarios = localStorage.getItem("scenarios");
    let scenarios: Scenario[] = savedScenarios ? JSON.parse(savedScenarios) : [];

    // Проверка на уникальность шифр-слова
    const isCodewordExists = scenarios.some(
      (scenario) => scenario.codeword.toLowerCase() === codeword.toLowerCase()
    );

    if (isCodewordExists) {
      setError("Такое шифр-слово уже существует");
      return;
    }

    // Создание нового сценария
    const newScenario: Scenario = {
      id: Date.now().toString(),
      codeword: codeword.trim(),
      result: result.trim(),
    };

    // Сохранение в localStorage
    const updatedScenarios = [...scenarios, newScenario];
    localStorage.setItem("scenarios", JSON.stringify(updatedScenarios));

    // Возврат на главную
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#1a0d1c] to-[#0f0710] p-6 text-white">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 text-[#d1a6bb] hover:text-[#ff5cad] hover:bg-[#231327]"
        >
          <ArrowLeft />
          Назад
        </Button>

        <div className="bg-[#231327] rounded-xl p-6 border border-[#ff5cad]/30 neon-box">
          <h1 className="text-2xl font-bold text-[#ff5cad] mb-6 neon-text">Создание нового сценария</h1>
          
          {error && (
            <div className="bg-[#3a0f1e] p-3 rounded mb-4 text-[#ff5cad] border border-[#ff5cad]/50 neon-border">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#d1a6bb] mb-1">
                Шифр-слово
              </label>
              <Input
                value={codeword}
                onChange={(e) => setCodeword(e.target.value)}
                placeholder="Введите секретное шифр-слово"
                className="border-[#ff5cad] focus-visible:ring-[#ff5cad] bg-[#2c1a30] neon-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#d1a6bb] mb-1">
                Результат
              </label>
              <Textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Что должно отобразиться при вводе шифр-слова"
                className="min-h-[120px] border-[#ff5cad] focus-visible:ring-[#ff5cad] bg-[#2c1a30] neon-input"
              />
            </div>

            <Button 
              onClick={saveScenario} 
              className="w-full bg-[#ff5cad] hover:bg-[#ff3896] text-black font-semibold neon-button"
            >
              <Save className="mr-2" />
              Сохранить сценарий
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScenario;
