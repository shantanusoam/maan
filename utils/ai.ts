import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { z } from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}
export const analyse = async (content) => {
const input = await getPrompt(content)
   const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
   const result = await model.call(input)
  try{
    return parser.parse(result)
  } catch(e){
    console.log(e)
  }

}
export const analyzeEntry = async (entry) => {
  const input = await getPrompt(entry.content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const output = await model.call(input)

  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
      parser
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}

export const qa = async (question, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}





// export const qa = async (question, entries) => {
//   const docs = entries.map(
//     (entry) =>
//       new Document({
//         pageContent: entry.content,
//         metadata: { source: entry.id, date: entry.createdAt },
//       })
//   );
//   const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
//   const chain = loadQARefineChain(model);
//   const embeddings = new OpenAIEmbeddings();
//   const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
//   const relevantDocs = await store.similaritySearch(question);

//   // Define the Bhagavad Gita context here (you can fetch it from the internet)
//   const bhagavadGitaContext = 'Take context from the internet';

//   // Create a combined query that includes the user's question and the Bhagavad Gita context
//   const combinedQuery = `${question} ${bhagavadGitaContext}`;

//   const res = await chain.call({
//     input_documents: relevantDocs,
//     question: combinedQuery,
//   });

//   // Convert the response to Lord Shri Krishna's style with the add-on solution
//   const krishnaResponse = toKrishnaStyle(res.output_text);

//   return krishnaResponse;
// };

// // Function to convert text to Lord Shri Krishna's style
// function toKrishnaStyle(text) {
//   // Define word replacements inspired by Shrimad Bhagavad Gita context
//   const krishnaWords = {
//     hello: 'Greetings, O seeker of truth!',
//     you: 'Thou',
//     your: 'Thy',
//     friend: 'Arjuna, My dear friend',
//     answer: 'wisdom',
//     // Add more word replacements inspired by Lord Shri Krishna's speech
//   };

//   // Replace words in the text with Lord Shri Krishna's style equivalents
//   const krishnaText = text.replace(/\b\w+\b/g, (word) => {
//     return krishnaWords[word.toLowerCase()] || word;
//   });

//   // Add the Bhagavad Gita-based solution to the response
//   const solution = 'Arjuna, you can improve your day by focusing on your duties and maintaining inner peace. Remember the teachings of the Bhagavad Gita and find happiness in your actions.';

//   return `${krishnaText} ${solution}`;
// }