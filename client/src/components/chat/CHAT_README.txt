# Navigation
- Each chat nav path must incldue user ID, ie http://localhost:4000/Chat/yourUserIDGoesHere

# Customize Navigation Bar ( Inside the Chat.jsx & Search_Form.jsx )
-   <Navigation 
        Options={['fa-message', 'fa-square-plus']} // Place font awsome 2nd set of class values here for desired icons
        URLs={['/Chat/' + User.id, '/Chat/Add/' + User.id]} // Set where each icon nav option navigates to
        Size={"2x"} // controls icon size possible values - ( "sm", "md", "lg", "xlg", "2x")
        Orientation={"Horiz"} // options ("Horiz", "Vert")
        Width={"20em"} // Sets width of Nav container
    /> 

# Customize chat view messages ( Inside the messages.jsx)
-   <Message 
        // Custom Inputs
        userOneColor={"red"} 
        userTwoColor={"black"} 
    />  

# Backend 

# When you create a custom user model at least needs this structure:
-   User.init({
        User_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            unique: true
        },
        Username: {
            type:Sequelize.STRING,
            allowNull: false
        },
    }, {sequelize});