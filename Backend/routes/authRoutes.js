router.post(
  "/register",

  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({
          where: { email },
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "Email already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const totalUsers =
        await User.count();

      let role = "user";

      if (totalUsers === 0) {
        role = "admin";
      }

      const user =
        await User.create({
          username,
          email,
          password:
            hashedPassword,
          role,
        });

      res.json({
        message:
          "Account created",

        user,
      });

    } catch (error) {

      res.status(500).json(error);
    }
  }
);