import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { cloudinary } from '@/app/config/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

type UploadResponse =
    | {
          success: true;
          result?: UploadApiResponse;
      }
    | {
          success: false;
          error: UploadApiErrorResponse;
      };

const uploadToCloudinary = (
    fileUri: string,
    fileName: string
): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            fileUri,
            {
                invalidate: true,
                resource_type: 'auto',
                filename_override: fileName,
                folder: 'product-images',
                use_filename: true,
                public_id: fileName,
            },

            (error, result) => {
                if (error) {
                    resolve({ success: false, error });
                } else {
                    resolve({ success: true, result });
                }
            }
        );
    });
};

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json(
            { message: 'No file uploaded' },
            { status: 400 }
        );
    }

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const fileUri = 'data:' + mimeType + ';' + encoding + ',' + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);

    if (res.success && res.result) {
        return NextResponse.json({
            message: 'success',
            imgUrl: res.result.secure_url,
        });
    } else return NextResponse.json({ message: 'failure' });
}
