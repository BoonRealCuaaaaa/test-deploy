import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AssistantLimitation } from 'src/shared/modules/kb-core-client/constants/assistant';
import { SUPPORTED_UPLOAD_FILE_TYPES } from 'src/shared/modules/kb-core-client/constants/supported-upload-file-type.constants';

const multerOptions = (fileTypes = SUPPORTED_UPLOAD_FILE_TYPES): MulterOptions => ({
  fileFilter: (_req, file, cb) => {
    const isSupported = fileTypes.some((supportedFile) => supportedFile.mimetype === file.mimetype);
    if (isSupported) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
  limits: {
    fileSize: AssistantLimitation.MAX_FILE_SIZE_ALLOWED,
  },
});

export default multerOptions;
