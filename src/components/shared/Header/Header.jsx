import { useTranslation } from 'react-i18next';
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator
} from "../../ui/breadcrumb"

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose
} from "../../ui/drawer"

import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useLanguageStore from '../../../store/useLanguageStore';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowBigRight, ChevronDown, ChevronUp, SearchIcon} from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '../../ui/dialog';

const src1 = "data:image/svg+xml;utf8,%3Csvg width='21' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='a'%3E%3Cstop stop-color='%23FFF' offset='0%'/%3E%3Cstop stop-color='%23F0F0F0' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='b'%3E%3Cstop stop-color='%230A17A7' offset='0%'/%3E%3Cstop stop-color='%23030E88' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='c'%3E%3Cstop stop-color='%23E6273E' offset='0%'/%3E%3Cstop stop-color='%23CF152B' offset='100%'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='url(%23a)' d='M0 0h21v15H0z'/%3E%3Cpath fill='url(%23b)' d='M-.002 0h21v15h-21z'/%3E%3Cpath d='M5.003 10H-.002V5h5.005L-2.082.22l1.118-1.657 8.962 6.045V-1h5v5.608l8.962-6.045L23.078.22 15.993 5h5.005v5h-5.005l7.085 4.78-1.118 1.657-8.962-6.045V16h-5v-5.608l-8.962 6.045-1.118-1.658L5.003 10z' fill='url(%23a)'/%3E%3Cpath d='M14.136 4.958l9.5-6.25a.25.25 0 00-.275-.417l-9.5 6.25a.25.25 0 10.275.417zm.732 5.522l8.515 5.74a.25.25 0 10.28-.415l-8.516-5.74a.25.25 0 00-.279.415zM6.142 4.526L-2.74-1.461a.25.25 0 00-.28.415L5.863 4.94a.25.25 0 00.279-.414zm.685 5.469l-9.845 6.53a.25.25 0 10.276.416l9.846-6.529a.25.25 0 00-.277-.417z' fill='%23DB1F35' fill-rule='nonzero'/%3E%3Cpath fill='url(%23c)' d='M-.002 9h9v6h3V9h9V6h-9V0h-3v6h-9z'/%3E%3C/g%3E%3C/svg%3E"
const src2 = "data:image/svg+xml;utf8,%3Csvg width='21' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='a'%3E%3Cstop stop-color='%23FFF' offset='0%'/%3E%3Cstop stop-color='%23F0F0F0' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='b'%3E%3Cstop stop-color='%23D9101C' offset='0%'/%3E%3Cstop stop-color='%23CA0814' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='c'%3E%3Cstop stop-color='%230F7811' offset='0%'/%3E%3Cstop stop-color='%230A650C' offset='100%'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='url(%23a)' d='M0 0h21v15H0z'/%3E%3Cpath fill='url(%23b)' d='M0 0h21v5H0z'/%3E%3Cpath fill='url(%23c)' d='M0 10h21v5H0z'/%3E%3Cpath fill='url(%23a)' d='M0 5h21v5H0z'/%3E%3Cpath d='M10.066 8A3.266 3.266 0 0110 7.5a.5.5 0 111 0c0 .09-.024.283-.066.5h.57c.274 0 .496.232.496.5 0 .276-.216.5-.495.5h-2.01A.503.503 0 019 8.5c0-.276.216-.5.495-.5h.571zM9.5 7a.5.5 0 110-1 .5.5 0 010 1zm2 0a.5.5 0 110-1 .5.5 0 010 1zm2 1a.5.5 0 110-1 .5.5 0 010 1zm-6 0a.5.5 0 110-1 .5.5 0 010 1z' fill='%23FAD14E'/%3E%3C/g%3E%3C/svg%3E"
const src3 = "data:image/svg+xml;utf8,%3Csvg width='21' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='a'%3E%3Cstop stop-color='%23FFF' offset='0%'/%3E%3Cstop stop-color='%23F0F0F0' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='b'%3E%3Cstop stop-color='%230C47B7' offset='0%'/%3E%3Cstop stop-color='%23073DA4' offset='100%'/%3E%3C/linearGradient%3E%3ClinearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='c'%3E%3Cstop stop-color='%23E53B35' offset='0%'/%3E%3Cstop stop-color='%23D32E28' offset='100%'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='url(%23a)' d='M0 0h21v15H0z'/%3E%3Cpath fill='url(%23b)' d='M0 5h21v5H0z'/%3E%3Cpath fill='url(%23c)' d='M0 10h21v5H0z'/%3E%3Cpath fill='url(%23a)' d='M0 0h21v5H0z'/%3E%3C/g%3E%3C/svg%3E"

const Header = () => {
  const savedLanguage = localStorage.getItem('language')
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [OpenSearchArea, setOpenSearchArea] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const handleClose = () => setIsOpen(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { name: t('Main'), path: '/' },
    { name: t('Flag'), path: '/flag' },
    { name: t('Emblem'), path: '/emblem' },
    { name: t('Anthem'), path: '/anthem' },
    { name: t('ATM'), path: '/contact' },
    { name: t('MS'), path: '/contact' },
    { name: t('NB'), path: '/contact' },
    { name: t('NS'), path: '/contact' },
    { name: t('Laws'), path: '/contact' },
    { name: t('Regulations'), path: '/contact' },
    { name: t('RD'), path: '/contact' },
    { name: t('Position'), path: '/contact' },
    { name: t('CS'), path: '/contact' },
    { name: t('Structure'), path: '/contact' },
    { name: t('Leadership'), path: '/contact' },
    { name: t('SP'), path: '/contact' },
    { name: t('SSS'), path: '/contact' },
  ];

  const components = [
    {
      title: "Position",
      href: "/docs/primitives/alert-dialog",
    },
    {
      title: "Structure",
      href: "/docs/primitives/hover-card",
    },
    {
      title: "CS",
      href: "/docs/primitives/progress",
    },
    {
      title: "Leadership",
      href: "/docs/primitives/scroll-area",
    },
  ];

  const components2 = [
    {
      title: "NP",
      href: "/docs/primitives/alert-dialog",
    },
    {
      title: "NS",
      href: "/docs/primitives/hover-card",
    },
    {
      title: "Laws",
      href: "/docs/primitives/progress",
    },
    {
      title: "Regulations",
      href: "/docs/primitives/scroll-area",
    },
    {
      title: "RD",
      href: "/docs/primitives/scroll-area",
    },
  ];
  const components3 = [
    {
      title: "PN",
      href: "/docs/primitives/alert-dialog",
    },
    {
      title: "Performances",
      href: "/docs/primitives/hover-card",
    },
    {
      title: "Messages",
      href: "/docs/primitives/progress",
    },
  ];

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <header className='sticky w-full top-0 z-[51]'>
      <nav className='flex justify-between gap-y-2 sticky top-0 p-2 py-1 bg-white dark:bg-[#030712] z-30 shadow-md shadow-[#d946ef30] rounded items-center dark:text-white'>
        <div className='flex gap-2 items-center sm-690:hidden'>
          <Link to={'/'}>
            <img src="/src/assets/img/Emblem_of_Tajikistan.svg.png" style={{ maxWidth: '40px', maxHeight: '40px', filter: 'drop-shadow(1px 1px 3px #040) brightness(1.2)' }} alt="" />
          </Link>
          <h1 className="max-w-[400px]">{t('MH')}</h1>
        </div>
        <div className='items-center sm-690:flex hidden mx-2 w-full bg-[#cccccc30] px-1 rounded-sm'>
          <SearchIcon className='text-purple-600' />
          <Input
            type='search'
            placeholder={t('SPs')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setOpenSearchArea(e.target.value != '' && true);
            }}
            className="shadow-none border-none focus-visible:ring-transparent"
          />
        </div>
        <div className='flex gap-2 xs-450:gap-1 items-center'>
          <Select onValueChange={(value) => {
            if (value === 'emblem') {
              navigate('/emblem');
            } else if (value === 'flag') {
              navigate('/flag');
            } else if (value === 'anthem') {
              navigate('/anthem');
            }
          }}>
            <SelectTrigger className="w-fit max-w-[180px] md-885:hidden">
              <SelectValue placeholder={t('SS')} />
            </SelectTrigger>
            <SelectContent className='z-[100]'>
              <SelectGroup>
                <SelectLabel className='border-b-2 mb-1'>{t('SS')}</SelectLabel>
                <SelectItem className="cursor-pointer" value="emblem">
                  <div className='flex gap-2 items-center'>
                    <img src="/src/assets/img/Emblem_of_Tajikistan.svg.png" style={{ maxWidth: '15px', height: '15px', filter: 'drop-shadow(1px 1px 3px #040) brightness(1.2)' }} alt="" />
                    {t('Emblem')}
                  </div>
                </SelectItem>
                <SelectItem className="cursor-pointer" value="flag">
                  <div className='flex gap-2 items-center'>
                    <img src={src2} className='rounded' style={{ maxWidth: '15px', height: '15px', filter: 'drop-shadow(1px 1px 3px #040) brightness(1.2)' }} alt="" />
                    {t('Flag')}
                  </div>
                </SelectItem>
                <SelectItem className="cursor-pointer" value="anthem">
                  <div className='flex gap-2 items-center'>
                    <h1 style={{ filter: 'drop-shadow(1px 1px 2px white)' }}>🎵</h1>
                    {t('Anthem')}
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => {
            setLanguage(value);
          }}>
            <SelectTrigger className="w-max xs-630:w-[60px]">
              <SelectValue placeholder={<h1 className='flex gap-2'>
                <img
                  src={savedLanguage == 'en' ? src1 : savedLanguage == 'tj' ? src2 : src3} className='rounded' alt="" />
                <h1 className='lg-1023:hidden'>{savedLanguage.toUpperCase()}</h1></h1>} />
            </SelectTrigger>
            <SelectContent className='z-[100]'>
              <SelectGroup>
                <SelectLabel className='border-b-2 mb-1'>{t('SL')}</SelectLabel>
                <SelectItem value="tj">
                  <div className='flex gap-2'>
                    <img src={src2} className='rounded' alt="" />
                    <h1>TJ</h1>
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className='flex gap-2'>
                    <img src={src1} className='rounded' alt="" />
                    <h1>EN</h1>
                  </div>
                </SelectItem>
                <SelectItem value="ru">
                  <div className='flex gap-2'>
                    <img src={src3} className='rounded' alt="" />
                    <h1>RU</h1>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsOpen(true)} variant='outline' className="p-2 sm-690:px-2 sm-690:hidden"><SearchIcon className='' /> <h1 className='md-885:hidden'><span className='bg-slate-50/30 text-[12px] border p-1 rounded-sm'>CTRL</span>+<span className='bg-slate-50/30 text-[12px] border p-1 rounded-sm'>K</span></h1> </Button>
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
            <DialogOverlay className="fixed inset-0 bg-transparent z-50" />
            <DialogContent
              className="items-start top-1/2 h-1/2 p-3 z-[100] rounded-md pt-2 gap-0"
            >
              <div className='flex items-center'>
                <SearchIcon className='text-purple-600' />
                <Input
                  placeholder={t('SPs')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="shadow-none border-none focus-visible:ring-transparent text-[18px]"
                />
              </div>
              <ScrollArea orientation='vertical' className="m-2 p-2 h-[98%] items-start">
                {filteredLinks.length != 0 ? filteredLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className="flex gap-2 hover:border-l-2 border-l-current dark:hover:text-purple-400 hover:text-purple-600 px-1 py-2 mr-1 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200/30 dark:hover:bg-gray-100/10 duration-200 border-b"
                    onClick={handleClose}
                  > <ArrowBigRight />
                    {link.name}
                  </Link>
                )) :
                  <div className='mx-auto w-fit flex gap-2 items-end'><p className='underline text-2xl'>{searchTerm}</p> {t('NF')}</div>}
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <DarkModeSwitch
            style={{ marginLeft: '10px', zIndex: '60' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={24}
          />
          <Drawer direction="top">
            <DrawerTrigger asChild>
              <Button variant="outline" className="font-extrabold ml-2 text-[25px] p-2"><ChevronDown /></Button>
            </DrawerTrigger>
            <DrawerContent className="top-0 rounded-lg bg-background/70 backdrop-blur-md">
              <div className="flex flex-col w-full">
                <DrawerHeader className='flex justify-center flex-col'>
                  <DrawerClose className='self-end fixed top-3'>
                    <Button variant="" className="font-extrabold text-[25px] p-[9px]"><ChevronUp /></Button>
                  </DrawerClose>
                  <DrawerTitle className="mb-4">{t('ALL')}</DrawerTitle>
                  <Link to={'/'}>
                    <div className='gap-1 items-center flex-col text-center flex text-[20px] mb-4 xs-450:text-[16px]'>
                      <img src="/src/assets/img/Emblem_of_Tajikistan.svg.png" style={{ maxWidth: '50px', maxHeight: '50px', filter: 'drop-shadow(1px 1px 3px #040) brightness(1.2)' }} alt="" />
                      <h1 className="">{t('MH')}</h1>
                    </div>
                  </Link>
                  <ScrollArea className="h-96 bg-background rounded-lg w-full max-w-[500px] mx-auto p-4">
                    <div className='gap-3 flex taskbar flex-wrap flex-col'>
                      {links.length > 0 && links.map((el, i) => {
                        return (
                          <Link
                            className="taskbar-icon"
                            key={i} style={{ overflowX: 'auto', scrollbarColor: 'transparent transparent', width: '100%', transition: 'all 0.3s' }}
                            to={el.path}>
                            <Button className='w-full hover:gap-6 gap-2 duration-200 border-none hover:bg-transparent text-[18px] justify-start hover:text-purple-500 xs-450:p-2' variant='outline'> <p className="text-[20px] font-extrabold">→</p> {el.name}</Button>
                          </Link>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </DrawerHeader>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
      {OpenSearchArea &&
        <div className="fixed overflow-auto max-h-[400px] z-50 w-[95%] bg-[#efefef] dark:bg-[#252934] rounded-md p-2">
          {filteredLinks.length != 0 ? filteredLinks.map((link, i) => (
            <div key={i}>
              <Link
                to={link.path}
                className="flex gap-2 hover:border-l-2 hover:bg-gray-200/30 dark:hover:bg-gray-100/10 border-l-current dark:hover:text-purple-400 hover:text-purple-600 px-1 py-2 mr-1 rounded-md text-gray-800 dark:text-gray-200 duration-200 border-b"
                onClick={handleClose}
              > <ArrowBigRight />
                {link.name}
              </Link>
            </div>
          )) :
            <div className='mx-auto w-fit flex gap-2 items-end'><p className='underline text-2xl'>{searchTerm.slice(0, 18)}{searchTerm.length > 18 ? '...' : ''}</p> {t('NF')}</div>}
        </div>
      }
      <nav
        className={`p-2 text-[20px] sticky top-0 bg-gradient-to-r from-red-600/30 to-green-600/30 shadow-md mx-auto bg-white/80 backdrop-blur-md dark:bg-[#030712]/70 rounded shadow-[#d946ef30] duration-300 ${isVisible ? "" : "-translate-y-full"
          }`}
      >
        <Breadcrumb className="pb-2 overflow-auto">
          <BreadcrumbList className="w-max">
            <BreadcrumbItem className='text-[20px] xs-600:text-[16px]'>
              <Link to={'/'}>
                <BreadcrumbLink>→{t('Main')}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            {pathnames.length > 2 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className='text-[20px] xs-600:text-[16px]'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {pathnames.slice(1, -1).map((path, index) => (
                        <DropdownMenuItem key={index}>
                          <Link to={`/${pathnames.slice(0, index + 1).join("/")}`}>
                            {t(path.slice(0, 1).toUpperCase() + path.slice(1))}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            )}

            {pathnames.map((path, index) => {
              const isLast = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return (
                <BreadcrumbItem key={to}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className='text-[20px] xs-600:text-[16px]' style={{ textTransform: 'uppercase' }}>
                    {isLast ? (
                      <span>{t(path.slice(0, 1).toUpperCase() + path.slice(1))}</span>
                    ) : (
                      <Link className='dark:hover:text-white hover:text-black' to={to}>{t(path.slice(0, 1).toUpperCase() + path.slice(1))}</Link>
                    )}
                  </BreadcrumbItem>
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={'/'}>
          <div className='hidden gap-1 items-center xs-450:flex-col xs-450:text-center sm-690:flex text-[14px]'>
            <img src="/src/assets/img/Emblem_of_Tajikistan.svg.png" style={{ maxWidth: '50px', maxHeight: '50px', filter: 'drop-shadow(1px 1px 3px #040) brightness(1.2)' }} alt="" />
            <h1 className="">{t('MH')}</h1>
          </div>
        </Link>
        <NavigationMenu position='top' className='w-fit mx-auto'>
          <NavigationMenuList>
            <NavigationMenuItem className='xs-450:mx-auto'>
              <NavigationMenuTrigger className="xs-450:p-2 xs-450:text-[13px]">{t('ATM')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[440px] xs-450:w-[305px] gap-3 p-2 xs-600:w-[355px] md:grid-cols-2 lg:w-[380px]">
                  {components.map((component) => (
                    <Link
                      to={component.href}
                      key={component.title}>
                      <ListItem
                        className="dark:hover:text-purple-300 hover:border-l-purple-400 border-l-2 border-l-transparent duration-300 hover:text-purple-500"
                        key={component.title}
                        title={<div className='flex gap-3 hover:gap-6 duration-200'> <p>→</p> {t(component.title)}</div>}
                      >
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className='xs-450:mx-auto'>
              <NavigationMenuTrigger className="xs-450:p-2 xs-450:text-[13px]">{t('NB')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[440px] xs-450:w-[305px] gap-3 p-2 xs-600:w-[355px] md:grid-cols-2 lg:w-[380px]">
                  {components2.map((component) => (
                    <Link
                      to={component.href}
                      key={component.title}>
                      <ListItem
                        className="dark:hover:text-purple-300 hover:border-l-purple-400 border-l-2 border-l-transparent duration-300 hover:text-purple-500"
                        key={component.title}
                        title={<div className='flex gap-3 hover:gap-6 duration-200'> <p>→</p> {t(component.title)}</div>}
                      >
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="xs-600:hidden">
              <NavigationMenuTrigger className="">{t('PRE')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[440px] xs-450:w-[305px] gap-3 p-2 xs-600:w-[355px] md:grid-cols-2 lg:w-[380px]">
                  {components3.map((component) => (
                    <Link
                      to={component.href}
                      key={component.title}>
                      <ListItem
                        className="dark:hover:text-purple-300 hover:border-l-purple-400 border-l-2 border-l-transparent duration-300 hover:text-purple-500"
                        key={component.title}
                        title={<div className='flex gap-3 hover:gap-6 duration-200'> <p>→</p> {t(component.title)}</div>}
                      >
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}

export default Header;

const ListItem = React.forwardRef(function ListItem(
  { className, title, children, ...props },
  ref
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});