import { Card, CardContent, CardHeader, Typography, Link } from '@material-ui/core'
import FlatPage from '../../components/flat-page'
import Footer from '../../components/footer'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="Privacy Policy" />

          <CardContent>
            <Typography className={clsx(classes.body)} variant="body2">
              At SAEON Data Portal, accessible from catalogue.saeon.ac.za, one of our main
              priorities is the privacy of our visitors. This Privacy Policy document contains types
              of information that is collected and recorded by SAEON Data Portal and how we use it.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              If you have additional questions or require more information about our Privacy Policy,
              do not hesitate to contact us. Our Privacy Policy was created with the help of the{' '}
              <Link href="https://www.privacypolicyonline.com/privacy-policy-generator/">
                Privacy Policy Generator
              </Link>
              .
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Log Files
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal follows a standard procedure of using log files. These files log
              visitors when they visit websites. All hosting companies do this and a part of hosting
              services&apos; analytics. The information collected by log files include internet
              protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time
              stamp, referring/exit pages, and page usage information (clicks and mouse tracking).
              These are not linked to any information that is personally identifiable. The purpose
              of the information is for analyzing trends, administering the site, tracking
              users&apos; movement on the website, and gathering demographic information.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Cookies and Web Beacons
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Like any other website, SAEON Data Portal uses &apos;cookies&apos;. These cookies are
              used to store information including visitors&apos; preferences, and the pages on the
              website that the visitor accessed or visited. The information is used to optimize the
              users&apos; experience by customizing our web page content based on visitors&apos;
              browser type and/or other information.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              For more general information on cookies, please read the &quot;What Are Cookies&quot;
              article on{' '}
              <Link href="https://www.cookieconsent.com/what-are-cookies/">
                Cookie Consent website
              </Link>
              .
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Privacy Policies
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You may consult this list to find the Privacy Policy for each of the advertising
              partners of SAEON Data Portal.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or
              Web Beacons that are used in their respective advertisements and links that appear on
              SAEON Data Portal, which are sent directly to users&apos; browser. They automatically
              receive your IP address when this occurs. These technologies are used to measure the
              effectiveness of their advertising campaigns and/or to personalize the advertising
              content that you see on websites that you visit.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Note that SAEON Data Portal has no access to or control over these cookies that are
              used by third-party advertisers.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Third Party Privacy Policies
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal&apos;s Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective Privacy Policies of
              these third-party ad servers for more detailed information. It may include their
              practices and instructions about how to opt-out of certain options.{' '}
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You can choose to disable cookies through your individual browser options. To know
              more detailed information about cookie management with specific web browsers, it can
              be found at the browsers&apos; respective websites. What Are Cookies?
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Children&apos;s Information
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Another part of our priority is adding protection for children while using the
              internet. We encourage parents and guardians to observe, participate in, and/or
              monitor and guide their online activity.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal does not knowingly collect any Personal Identifiable Information
              from children under the age of 13. If you think that your child provided this kind of
              information on our website, we strongly encourage you to contact us immediately and we
              will do our best efforts to promptly remove such information from our records.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Online Privacy Policy Only
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              This Privacy Policy applies only to our online activities and is valid for visitors to
              our website with regards to the information that they shared and/or collect in SAEON
              Data Portal. This policy is not applicable to any information collected offline or via
              channels other than this website.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Consent
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms
              and Conditions.
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
      <Footer />
    </>
  )
}
