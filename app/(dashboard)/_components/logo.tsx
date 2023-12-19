import Image from 'next/image';

const Logo = () => {
  return <Image alt='logo' src={'/images/logo.svg'} width={130} height={1} />;
};

export default Logo;
