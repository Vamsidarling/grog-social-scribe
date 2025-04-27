
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GROG_API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  prompt: string;
  platform: string;
}

function getPlatformPrompt(platform: string): string {
  switch (platform) {
    case 'twitter':
      return `You are a social media expert specializing in Twitter/X posts.
      
Your task is to create engaging, concise Twitter content based on the user's input.

Guidelines:
- Keep tweets under 280 characters when possible
- Include relevant hashtags (2-3 maximum)
- Create content that's likely to drive engagement (likes, retweets, replies)
- Maintain a conversational, authentic tone
- If appropriate, phrase content as a question or thought-provoking statement
- Avoid excessive emojis, but use them strategically when appropriate
- Focus on creating value for the reader

The content should be ready to post as-is, with no additional editing needed.`;

    case 'instagram':
      return `You are a social media expert specializing in Instagram caption writing.
      
Your task is to create engaging, visually-evocative Instagram captions based on the user's input.

Guidelines:
- Write captions that complement visual content
- Include relevant hashtags (separated from the main caption, 5-8 hashtags)
- Create content that encourages engagement (likes, comments, saves)
- Use appropriate emojis to enhance the message
- Create a conversational, authentic tone
- Include a call-to-action where appropriate
- Focus on storytelling and emotional connection

Format the response as:
[Main Caption]

.
.
.

[Hashtags]`;

    case 'facebook':
      return `You are a social media expert specializing in Facebook content.
      
Your task is to create engaging Facebook posts based on the user's input.

Guidelines:
- Write content optimized for the Facebook algorithm and user behavior
- Focus on creating conversation and community interaction
- Include questions or calls to action to boost engagement
- Keep posts concise but more detailed than Twitter (1-3 paragraphs ideal)
- Use minimal hashtags (0-2 maximum) and only when truly relevant
- Maintain a friendly, conversational tone
- Format with line breaks for readability
- Consider incorporating elements that encourage sharing

The content should be ready to post as-is, with no additional editing needed.`;

    case 'linkedin':
      return `You are a social media expert specializing in LinkedIn professional content.
      
Your task is to create engaging, professional LinkedIn posts based on the user's input.

Guidelines:
- Write content that demonstrates thought leadership and expertise
- Structure posts with short paragraphs and line breaks for readability
- Include a strong hook in the first 2-3 lines (before the "see more" cutoff)
- Maintain a professional yet conversational tone
- Include relevant hashtags (3-5) at the end of the post
- Focus on providing valuable insights, lessons, or perspectives
- Consider adding a call-to-action for engagement
- Aim for content that positions the user as knowledgeable in their field

The content should be ready to post as-is, with no additional editing needed.`;

    default:
      return `You are a social media expert.
      
Your task is to create engaging social media content based on the user's input.

Guidelines:
- Create content that's engaging and valuable to the audience
- Maintain a conversational, authentic tone
- Focus on clarity and conciseness
- Include calls to action when appropriate

The content should be ready to post as-is, with no additional editing needed.`;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    })
  }

  try {
    const { prompt, platform } = await req.json() as RequestBody;
    
    if (!prompt || !platform) {
      return new Response(
        JSON.stringify({ error: 'Missing prompt or platform' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = getPlatformPrompt(platform);

    const response = await fetch(GROG_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GROG_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      },
    )
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    )
  }
})

