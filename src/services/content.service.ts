
import { generateAIContent } from "../lib/aiClient";
import Content, { IContent } from "../models/Content";
import { ContentStatus } from "../schemas/content.schema";

export class ContentService {
  static async generateContent(userId: string, prompt: string, type: string): Promise<IContent> {
    const content = await Content.create({
      userId,
      prompt,
      type,
      status: ContentStatus.PROCESSING,
    });

    try {
      // Call AI
      const generatedText = await generateAIContent(prompt, type);

      content.generatedText = generatedText;
      content.status = ContentStatus.DONE;
      await content.save();
    } catch (err: any) {
      content.status = ContentStatus.FAILED;
      content.generatedText = "";
      await content.save();
      throw new Error("AI generation failed: " + err.message);
    }

    return content;
  }

  // Get all content for a user
  static async getUserContent(userId: string) {
    return Content.find({ userId }).sort({ createdAt: -1 });
  }

  // Get content by ID
  static async getContentById(contentId: string, userId: string) {
    const content = await Content.findOne({ _id: contentId, userId });
    if (!content) throw new Error("Content not found");
    return content;
  }

//   Update content
  static async updateContent(
  contentId: string,
  userId: string,
  updateData: Partial<{ title: string; prompt: string; type: string }>
): Promise<IContent> {
  const content = await Content.findOne({ _id: contentId, userId });
  if (!content) throw new Error("Content not found !");

  if (updateData.title !== undefined) content.title = updateData.title;
  if (updateData.prompt !== undefined) content.prompt = updateData.prompt;
  if (updateData.type !== undefined) content.type = updateData.type;

  await content.save();
  return content;
}

// Delete content
  static async deleteContent(contentId: string, userId: string): Promise<void> {
  const deleted = await Content.findOneAndDelete({ _id: contentId, userId });
  if (!deleted) throw new Error("Content not found");
}

}
