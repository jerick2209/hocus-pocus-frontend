const Footer = () => {
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <footer>
                <p className="text-muted text-center">&copy;&nbsp;Copyright Hocus Pocus - 2023
                <br/><small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small></p>
            </footer>
        </div>
    );
};

export default Footer;
