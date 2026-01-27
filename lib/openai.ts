type OpenAIResult = {
  term: string;
  summary: string;
  description: string;
};

const fallbackResult = (query: string): OpenAIResult => ({
  term: query,
  summary: "Add OPENAI_API_KEY to generate a real summary.",
  description:
    "This is a placeholder response. Set OPENAI_API_KEY in .env to enable ChatGPT output."
});

export const generateTermExplanation = async (
  query: string
): Promise<OpenAIResult> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackResult(query);
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "너는 비전공자도 이해할 수 있도록 아주 쉽고 친절하게 설명한다. 한국어 설명을 기본으로 하되, 용어 자체는 통용되는 한글 표기가 있을 때만 번역하고 일반적으로 영어를 쓰는 용어는 영어로 유지한다. summary는 한 문장으로 아주 쉽게, description은 쉬운 말로 4~6문장으로 더 자세히 설명한다. 필요하면 간단한 비유나 예시를 1~2문장 덧붙인다. JSON 형식으로 term, summary, description을 반환해라."
        },
        { role: "user", content: query }
      ],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    return fallbackResult(query);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    return fallbackResult(query);
  }

  try {
    const parsed = JSON.parse(content) as OpenAIResult;
    return {
      term: parsed.term ?? query,
      summary: parsed.summary ?? "No summary",
      description: parsed.description ?? "No description"
    };
  } catch {
    return fallbackResult(query);
  }
};


