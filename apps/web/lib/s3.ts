import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isS3Configured, serverEnv } from "@/lib/env";

let cachedClient: S3Client | null = null;

function s3Client(): S3Client {
  if (!cachedClient) {
    cachedClient = new S3Client({
      region: serverEnv.awsRegion,
      credentials: {
        accessKeyId: serverEnv.awsAccessKeyId!,
        secretAccessKey: serverEnv.awsSecretAccessKey!,
      },
    });
  }
  return cachedClient;
}

export async function presignS3Upload(
  key: string,
  contentType: string,
  contentLength: number,
) {
  if (!isS3Configured()) {
    throw new Error("AWS S3 is not fully configured.");
  }
  const command = new PutObjectCommand({
    Bucket: serverEnv.awsS3Bucket,
    Key: key,
    ContentType: contentType,
    ContentLength: contentLength,
  });
  const uploadUrl = await getSignedUrl(s3Client(), command, { expiresIn: 600 });
  const publicUrl =
    serverEnv.awsS3PublicUrl?.replace(/\/$/, "") + "/" + encodeURIComponent(key) ||
    `https://${serverEnv.awsS3Bucket}.s3.${serverEnv.awsRegion}.amazonaws.com/${encodeURIComponent(key)}`;
  return { uploadUrl, publicUrl };
}
