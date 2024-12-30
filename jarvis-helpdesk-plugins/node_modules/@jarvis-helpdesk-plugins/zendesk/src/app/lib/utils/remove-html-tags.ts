export function removeHtmlTags(input: string): string {
  return input
    .replace(/<\/?[^>]+(>|$)/g, ' ') // Thay thế thẻ HTML bằng khoảng trắng
    .replace(/&nbsp;/gi, ' ') // Thay thế &nbsp; bằng khoảng trắng
    .replace(/&[^;\s]+;/g, '') // Loại bỏ các thực thể HTML khác
    .replace(/\s+/g, ' ') // Thay thế nhiều khoảng trắng bằng một khoảng trắng
    .trim();
}
