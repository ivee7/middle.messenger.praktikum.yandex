import { withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import template from './link.hbs';

interface NavLinkProps {
  text: string;
  to: string;
  linkClass?: string;
  linkType?: string;
  dataDimmer?: string;
  onClick?: () => void;
}

class NavLink extends Block {
  constructor(props: NavLinkProps) {
    super({
      ...props,
      events: {
        click: props.onClick ? props.onClick : () => this.navigate(),
      },
    });
  }

  navigate() {
    if (!this.props.router){
      return;
    }
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}

export const Link = withRouter(NavLink);
