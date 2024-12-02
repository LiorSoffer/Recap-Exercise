// say hi
const sayHi = async (req, res) => {
  try {
    const notes = "Hello World"
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sayHi,
};