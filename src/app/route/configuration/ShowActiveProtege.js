const styles = theme => ({

    actions: {
        display: 'flex',
    },
    
    avatar: {
      backgroundColor: 'white',
      margin: 5,
      width: 50,
      height: 50,
    },
    
    button: {
      margin: theme.spacing.unit,
    },
    
    card: {
      //maxWidth: 800,
      backgroundColor: 'white[500]'
    },
    
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    
    indentation:{
      width: 80,
    },
    
    item: {
      paddingTop: theme.spacing.unit,
    },
    
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});

function ShowActiveProtege(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    avatar = {
                        <Avatar className={classes.avatar}>
                            <div> {this.props.ninja.displayName[0]} </div>
                        </Avatar>
                    }
                    action = {
                        <div> 
                            <IconButton>
                                <EditIcon className={classes.button} onClick={this.togglePencil.bind(this, this.props.ninja)} />
                            </IconButton>

                            <IconButton>
                                <DeleteIcon className={classes.button} onClick={this.openSuspendDialog.bind(this, this.props.ninja)} />
                                {/* <DeleteIcon className={classes.button} onClick={this.handleDelete.bind(this, ninja)} /> */}
                            </IconButton>
                        </div>   
                    }
                    title={ 
                        <div> 
                            {this.props.ninja.id}. {this.props.ninja.displayName} ({this.props.ninja.pK}) 
                        </div> 
                    }  
                    subheader={this.props.ninja.status}
                />
                
                <Divider variant="middle" />

                {/* <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                /> */}
                
                <CardContent>
                    
                    <Grid container spacing={16} className={classes.item}>
                        <Grid item className={classes.indentation}> </Grid>

                        <Grid item xs>
                            <Typography variant='body1'> Join Date: </Typography>
                            <Typography variant='body2' paragraph> {this.props.ninja.joinDate} </Typography>
                        </Grid>
                        
                        <Grid item xs>
                            <div>
                                <Typography variant='body1'> Mentor's Name: </Typography>
                                <Typography variant='body2' paragraph> { this.props.ninja.mentorName } </Typography>

                                <Typography variant='body1'> Mentor's Email: </Typography>
                                <Typography variant='body2' paragraph> { this.props.ninja.mentorEmail } </Typography>
                            </div>
                        </Grid>
                        
                        <Grid item xs>
                            <div>
                                <Typography variant='body1'> Electives: </Typography>
                                <Typography variant='body2'> • { this.props.ninja.electives[0] } </Typography>
                                <Typography variant='body2'> • { this.props.ninja.electives[1] } </Typography>
                                <Typography variant='body2'> • { this.props.ninja.electives[2] } </Typography>
                                <Typography variant='body2'> • { this.props.ninja.electives[3] } </Typography>
                            </div>
                        </Grid>

                        <Grid item className={classes.indentation}> </Grid>
                    </Grid>

                </CardContent>
                
            </Card>
        <br /> </div>
    )
}


ShowActiveProtege.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(activeProtege, ShowActiveProtege);