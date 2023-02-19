import user from '../models/user.js';

const addTasks = async (req, res) => {
  try {
    const {title, description} = req.body;
    if (!title || !description) {
      return res.status(400).json({
        message: `Kindly Add the title and description`,
        status: false,
      });
    }
    const user = await user.findById(req.user._id);

    await user.tasks.push({
      title,
      description,
      createdAt: new Date(Date.now()).toISOString().slice(0, 10),
      completed: false,
    });

    await user.save();
    res.status(200).json({
      message: 'Add Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: `Kindly Add the title and description for update`,
        status: false,
      });
    }

    const {id} = req.params;
    let user = await user.findById(req.user._id);
    user.tasks = user.tasks.find(
      task => task._id.toString() === id.toString(),
    );
    user.tasks = {
      title,
      description,
      createdAt: new Date(Date.now()),
      completed: true,
    };

    await user.save();
    res.status(200).json({
      message: 'Updated Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `${error}`,
      status: false,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await user.findById(req.user._id);

    user.tasks = userOne.tasks.filter(ele => ele.id !== id);

    await user.save();
    res.status(200).json({
      message: 'Deleted Successfully',
      status: true,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some Error Occcured ===========> ${error}`,
      status: false,
    });
  }
};
export {updateTask, deleteTask, addTasks};
