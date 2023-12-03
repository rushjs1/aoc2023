export async function day3() {
  console.log("day3");

  try {
    const res = await fetch("../../public/day3.txt");

    if (!res.ok) {
      throw new Error("Faild to load file.");
    }

    const data = await res.text();

    console.log(data);
  } catch (error) {
    throw new Error("Failed to load file.");
  }
}
