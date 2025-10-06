import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport
} from "@/components/ui/navigation-menu"

function Home() {
    return (
        <>
            <div className="flex h-29 w-28 items-center justify-center bg-red-600">
                <h1 className="text-white">Home</h1>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>项目一</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink className="w-[5000px]">
                                链接11111
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="bg-neutral-600 p-4 text-white">1111</div>
        </>
    )
}

export default Home
