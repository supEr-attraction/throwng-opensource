const convertToDataUR = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // 이미지 데이터를 Blob으로 변환

    // FileReader로 이미지 인코딩
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result); // Base64 문자열을 데이터 URL로 반환
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Blob 데이터를 Base64로 인코딩
    });
  } catch (error) {
    console.error(error);
  }
};

export default convertToDataUR;
