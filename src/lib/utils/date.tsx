/**
 * yyyy년 mm월 dd일 형식의 문자열을 Date 객체로 변환합니다.
 */
export function localDateParseToNumberDate(dateString: string) {
  const dateParts = dateString.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  // eslint-disable-next-line
  const [_, year, month, day] = dateParts || []
  return new Date(Number(year), Number(month) - 1, Number(day))
}

/**
 * Date 객체를 yyyy년 mm월 dd일 형식의 문자열로 변환합니다.
 */
export function numberDateParseToLocalDate(date: string) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
