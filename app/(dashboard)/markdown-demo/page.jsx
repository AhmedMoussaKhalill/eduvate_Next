'use client';

import MarkdownApiResponse from '@/components/markdown-api-response';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MarkdownRenderer from '@/components/ui/markdown-renderer';

export default function MarkdownDemo() {
  // Example markdown with math expressions and code blocks
  const exampleMarkdown = `
# Markdown with Math Support

## Math Expressions

Here are some examples of math expressions:

Inline math: $E = mc^2$

Block math:

$$
\\frac{d}{dx}(\\sin x) = \\cos x
$$

$$
\\operatorname{Cov}(A,B) = \\frac{\\sum_{i=1}^{n}(a_i - \\bar{A})(b_i - \\bar{B})}{n}
$$

## Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

\`\`\`python
def square(x):
    return x * x
\`\`\`

## Lists

* Item 1
* Item 2
  * Nested item
* Item 3

1. First item
2. Second item
3. Third item
`;

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Markdown API Response Demo</CardTitle>
          <CardDescription>
            This page demonstrates how to use React Markdown to render API
            responses in markdown format with math support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownApiResponse
            endpoint="/api/chat"
            initialPrompt="Explain the covariance formula and provide examples of its application using markdown formatting, including math expressions."
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Math and Code Examples</CardTitle>
          <CardDescription>
            Demonstrating built-in support for math expressions and code blocks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer content={exampleMarkdown} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <h3>How to Use the Markdown Renderer Component</h3>
          <p>To use the Markdown Renderer in your own components:</p>
          <ol>
            <li>
              Import the MarkdownRenderer component:
              <pre>
                <code>{`import MarkdownRenderer from '@/components/ui/markdown-renderer';`}</code>
              </pre>
            </li>
            <li>
              Use it in your component:
              <pre>
                <code>{`<MarkdownRenderer content={markdownText} />`}</code>
              </pre>
            </li>
          </ol>

          <h3>For API Responses</h3>
          <p>
            You can use the MarkdownApiResponse component for complete
            integration:
          </p>
          <pre>
            <code>{`import MarkdownApiResponse from '@/components/markdown-api-response';

// In your component:
<MarkdownApiResponse endpoint="/api/your-endpoint" initialPrompt="Optional initial prompt" />`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
