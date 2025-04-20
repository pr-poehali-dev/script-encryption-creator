
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f6f6f7] to-[#e5deff] p-6">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 text-[#8E9196] hover:text-[#1A1F2C] hover:bg-[#F1F0FB]"
        >
          <ArrowLeft />
          Назад
        </Button>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-[#1A1F2C] mb-6">Создание нового сценария</h1>
          
          {error && (
            <div className="bg-[#FFDEE2] p-3 rounded mb-4 text-[#ea384c]">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#8E9196] mb-1">
                Шифр-слово
              </label>
              <Input
                value={codeword}
                onChange={(e) => setCodeword(e.target.value)}
                placeholder="Введите секретное шифр-слово"
                className="border-[#D6BCFA] focus-visible:ring-[#9b87f5]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8E9196] mb-1">
                Результат
              </label>
              <Textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Что должно отобразиться при вводе шифр-слова"
                className="min-h-[120px] border-[#D6BCFA] focus-visible:ring-[#9b87f5]"
              />
            </div>

            <Button 
              onClick={saveScenario} 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              <Save />
              Сохранить сценарий
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateScenario;
